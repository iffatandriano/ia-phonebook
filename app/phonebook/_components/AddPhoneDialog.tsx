"use client";

import Dialog from "@/src/components/dialog/Dialog";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  ContactFormSchema,
  ContactFormValues,
} from "@/src/lib/forms/ContactSchema";
import { PlusCircle, TrashIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/src/components/ui/use-toast";
import { cn } from "@/src/lib/utils";
import { useMutation } from "@apollo/client";
import {
  AddNewContactListDocument,
  GetContactListDocument,
} from "@/src/graphql/contact/contacts.generated";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/src/components/ui/toast";
import { Order_By } from "@/src/graphql/types.generated";

const AddPhoneDialog = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [mutate] = useMutation(AddNewContactListDocument);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {},
  });

  const { fields, append, remove } = useFieldArray({
    name: "phones",
    control: form.control,
  });

  const onSubmit = useCallback(
    async (values: ContactFormValues) => {
      setIsLoading(true);

      const formDatas: any = {
        first_name: values.firstName,
        last_name: values.lastName,
        phones: values.phones,
      };

      await mutate({
        variables: {
          ...formDatas,
          phones: formDatas.phones,
        },
        refetchQueries: [
          {
            query: GetContactListDocument,
            variables: {
              limit: 10,
              offset: 0,
              order_by: {
                id: Order_By.DescNullsLast,
              },
            },
          },
        ],
      })
        .then((resp) => {
          toast({
            description: (
              <span className="mt-2 rounded-md p-2 text-green-600 font-semibold">
                You new contact has been created.{" "}
              </span>
            ),
          });

          router.refresh();

          setIsOpen(false);
          setIsLoading(false);

          return resp;
        })
        .catch((err) => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });

          setIsLoading(false);

          return err;
        });
    },
    [toast, mutate, router]
  );

  const body = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`phones.${index}.number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Phones
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="number format: 62 or 08 "
                        {...field}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ number: "" })}
          >
            {fields.length === 0 ? "Add new phone" : "Add other phone"}
          </Button>
        </div>
        <div className="flex justify-end items-end">
          <Button variant="secondary" type="submit" disabled={isLoading}>
            Save phone
          </Button>
        </div>
      </form>
    </Form>
  );

  return (
    <Dialog
      action={
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <PlusCircle size={22} color="#16A34A" />
        </Button>
      }
      actionLabel="Save phone"
      isOpen={isOpen}
      title="Add list phone"
      description="Add new list contact to your phonebook"
      body={body}
      onSubmit={form.handleSubmit(onSubmit)}
    />
  );
};

export default AddPhoneDialog;
