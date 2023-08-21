"use client";
import React, { useCallback, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useToast } from "@/src/components/ui/use-toast";
import { useForm } from "react-hook-form";
import {
  PhoneContactSchema,
  PhoneContactValues,
} from "@/src/lib/forms/ContactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { CheckIcon, XCircleIcon } from "lucide-react";
import Loading from "@/src/components/Loading";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import {
  AddPhoneToContactDocument,
  GetDetailsContactByIdDocument,
} from "@/src/graphql/contact/contacts.generated";
import { ToastAction } from "@/src/components/ui/toast";

interface AddPhoneContactProps {
  id?: any;
  setIsOpenCreatePhone: any;
}

const AddPhoneContact: React.FC<AddPhoneContactProps> = ({
  id,
  setIsOpenCreatePhone,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const [mutate] = useMutation(AddPhoneToContactDocument);

  const form = useForm<PhoneContactValues>({
    resolver: zodResolver(PhoneContactSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const onSubmit = useCallback(
    async (values: PhoneContactValues) => {
      setIsLoading(true);

      await mutate({
        variables: {
          contact_id: id,
          phone_number: values.phoneNumber,
        },
        refetchQueries: [
          {
            query: GetDetailsContactByIdDocument,
            variables: {
              id: id,
            },
          },
        ],
      })
        .then((resp) => {
          toast({
            description: (
              <span className="mt-2 rounded-md p-2 text-green-600 font-semibold">
                Phone number has been added to contact.
              </span>
            ),
          });

          router.refresh();

          setIsLoading(false);
          setIsOpenCreatePhone(false);

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
    [id, router, mutate, toast, setIsOpenCreatePhone]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <div className="flex gap-2 items-center">
                  <Input placeholder="number format: 62 or 08" {...field} />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      form.setValue("phoneNumber", "");
                      setIsOpenCreatePhone(false);
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

export default AddPhoneContact;
