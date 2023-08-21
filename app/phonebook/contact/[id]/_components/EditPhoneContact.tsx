/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { CheckIcon, XCircleIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { useToast } from "@/src/components/ui/use-toast";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { ToastAction } from "@/src/components/ui/toast";

import Loading from "@/src/components/Loading";

import {
  PhoneContactSchema,
  PhoneContactValues,
} from "@/src/lib/forms/ContactSchema";

import { EditPhoneNumberDocument } from "@/src/graphql/contact/contacts.generated";

interface EditPhoneContactProps {
  contact?: any;
  selectedPhone: any;
  setIsOpenEditPhone: any;
}

const EditPhoneContact: React.FC<EditPhoneContactProps> = ({
  contact,
  selectedPhone,
  setIsOpenEditPhone,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const [mutate] = useMutation(EditPhoneNumberDocument);

  const form = useForm<PhoneContactValues>({
    resolver: zodResolver(PhoneContactSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  useEffect(() => {
    form.setValue("phoneNumber", selectedPhone?.number);
  }, []);

  const onSubmit = useCallback(
    async (values: PhoneContactValues) => {
      setIsLoading(true);

      await mutate({
        variables: {
          pk_columns: {
            number: selectedPhone.number,
            contact_id: contact.id,
          },
          new_phone_number: values.phoneNumber,
        },
      })
        .then((resp) => {
          toast({
            description: (
              <span className="mt-2 rounded-md p-2 text-green-600 font-semibold">
                Phone number has been changed.
              </span>
            ),
          });

          router.refresh();

          setIsLoading(false);
          setIsOpenEditPhone(false);

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
    [contact, router, mutate, toast, setIsOpenEditPhone, selectedPhone]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Input placeholder="number format: 62 or 08" {...field} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      form.setValue("phoneNumber", "");
                      setIsOpenEditPhone(false);
                    }}
                  >
                    <XCircleIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" type="submit" size="sm">
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <CheckIcon className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default EditPhoneContact;
