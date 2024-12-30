import {
  Alert,
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconInfoCircle } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";

import { authService } from "@host/services/auth";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const form = useForm<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      window.location.href = "http://localhost:4200/";
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => mutate(values))}>
          <TextInput
            label="Username"
            placeholder="Username"
            required
            {...form.getInputProps("username")}
            key={form.key("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
            key={form.key("password")}
          />

          {error && (
            <Alert
              variant="light"
              color="red"
              icon={<IconInfoCircle />}
              mt="lg"
            >
              {error.message}
            </Alert>
          )}
          <Button fullWidth mt="xl" type="submit" loading={isPending}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
