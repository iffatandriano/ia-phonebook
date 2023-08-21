/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { useMutation } from "@apollo/client";

import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useToast } from "@/src/components/ui/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { Input } from "@/src/components/ui/input";

import {
  EditContactFormSchema,
  EditContactFormValues,
} from "@/src/lib/forms/ContactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EditContactListDocument,
  GetDetailsContactByIdDocument,
} from "@/src/graphql/contact/contacts.generated";
import Loading from "@/src/components/Loading";

const defaultValues: Partial<EditContactFormValues> = {
  firstName: "",
  lastName: "",
};

const EditContactForm = () => {
  const [detailContact, setDetailContact] = useState<any>({});
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EditContactFormValues>({
    resolver: zodResolver(EditContactFormSchema),
    defaultValues,
  });

  const setContactForm = useCallback(
    async (listContact: any) => {
      await form.setValue("firstName", listContact.first_name);
      await form.setValue("lastName", listContact.last_name);
    },
    [form]
  );

  useEffect(() => {
    const contact = localStorage.getItem("contact");
    if (contact) {
      const listContact = JSON.parse(contact);
      setDetailContact(listContact);
      setContactForm(listContact);
    }
  }, []);

  const [mutate] = useMutation(EditContactListDocument);

  const onSubmit = useCallback(
    async (values: EditContactFormValues) => {
      setIsLoading(true);

      await mutate({
        variables: {
          id: Number(detailContact.id),
          _set: {
            first_name: values.firstName,
            last_name: values.lastName,
          },
        },
        refetchQueries: [
          {
            query: GetDetailsContactByIdDocument,
            variables: {
              id: detailContact.id,
            },
          },
        ],
      })
        .then((resp) => {
          toast({
            description: (
              <span className="mt-2 rounded-md p-2 text-green-600 font-semibold">
                Your contact has been changed
              </span>
            ),
          });

          router.push(`/phonebook/contact/${detailContact.id}`);

          localStorage.removeItem("contact");
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
    [toast, mutate, router, detailContact.id]
  );

  return (
    <div className="flex flex-col">
      <div className="min-h-screen flex flex-col gap-3">
        <div className="bg-white rounded-[8px]">
          <div className="py-2 px-4 flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Button
                variant="ghost"
                onClick={() => {
                  localStorage.removeItem("contact");
                  router.back();
                }}
              >
                <ChevronLeftIcon size={24} />
              </Button>
              <div className="w-full">Edit Name Contact</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px]">
          <div className="py-2 px-4 flex flex-col gap-3 items-center justify-center">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center">
              IA
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[8px]">
          <div className="py-2 px-4 flex flex-col gap-3 justify-start">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <div className="flex justify-end items-end">
                  <Button
                    variant="secondary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loading /> : "Save phone"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactForm;
