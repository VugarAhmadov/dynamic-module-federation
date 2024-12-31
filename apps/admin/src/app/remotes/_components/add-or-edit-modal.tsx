"use client";

import { useEffect } from "react";
import { Button, Flex, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { createOrUpdateRemote } from "@admin/actions/remote";
import { IUserRemote } from "@admin/types";

type FormType = Omit<IUserRemote, "id" | "isActive">;

export function AddOrEditModal({
  opened,
  onClose,
  data,
}: {
  opened: boolean;
  onClose: () => void;
  data: IUserRemote | null;
}) {
  const form = useForm({
    initialValues: {
      label: "",
      scope: "",
      moduleName: "",
      remoteUrl: "",
      frontUrl: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValues(data);
    }

    return () => {
      form.reset();
    };
  }, [data]);

  const processForm = async (values: FormType) => {
    const result = await createOrUpdateRemote({
      ...values,
      isActive: true,
      id: data ? data.id : null,
    });

    if (result === "ok") {
      notifications.show({
        title: "Success",
        message: data ? "Edited successfully" : "Created successfully",
      });
      form.reset();
      onClose();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={data ? "Edit Remote" : "Add Remote"}
      centered
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={form.onSubmit(processForm)}
      >
        <TextInput
          label="Scope"
          {...form.getInputProps("scope")}
          key={form.key("scope")}
        />
        <TextInput
          label="Module name"
          {...form.getInputProps("moduleName")}
          key={form.key("moduleName")}
        />
        <TextInput
          label="Remote Entry URL"
          {...form.getInputProps("remoteUrl")}
          key={form.key("remoteUrl")}
        />
        <TextInput
          label="Front URL"
          {...form.getInputProps("frontUrl")}
          key={form.key("frontUrl")}
        />
        <TextInput
          label="Label/Title"
          {...form.getInputProps("label")}
          key={form.key("label")}
        />
        <Flex justify="space-between" gap="lg" mt="20px">
          <Button variant="default" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth type="submit">
            Submit
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
