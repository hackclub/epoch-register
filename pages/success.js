import {
  Card,
  Container,
  Text,
  Box
} from 'theme-ui'

export default function Register({ notFound, registrationRecord, params }) {
  return (
    <Container py={4} variant="copy">
      <Card
        px={[4, 4]}
        py={[3, 3]}
        sx={{
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Box sx={{ color: 'green', fontSize: '27px', fontWeight: 800, mb: 2 }}>
        Thank you for signing up!
        </Box>
        <Box sx={{lineHeight: '1.4'}}>
          We're really excited to meet you! To confirm your registration, you'll need to join the <Text
            as={'a'}
            href="https://hackclub.com/slack"
            target="_blank"
            sx={{ color: 'red' }}
          >
            Hack Club Slack
          </Text>. We've emailed you with instructions to join and confirm your registration.
        </Box>
      </Card>
    </Container>
  )
}
