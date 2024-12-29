import { Button, Container, Text, Title } from "@mantine/core";

export function ErrorFallback() {
  return (
    <div>
      <Container>
        <Title order={2}>Something bad just happened...</Title>
        <Text size="lg">
          Our servers could not handle your request. Don&apos;t worry, our
          development team was already notified. Try refreshing the page.
        </Text>
        <Button
          variant="light"
          size="md"
          onClick={() => window.location.reload()}
        >
          Refresh the page
        </Button>
      </Container>
    </div>
  );
}
