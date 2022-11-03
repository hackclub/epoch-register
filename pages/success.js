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
        mt={5}
        sx={{
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Box sx={{ color: 'pink', fontSize: 5, fontWeight: 800, mb: 2 }}>
        Thank you for signing up!
        </Box>
        <Box sx={{lineHeight: '1.4', fontSize: 2}}>
          We're really excited to meet you! To confirm your registration, you'll need to join the <Text
            as={'a'}
            href="https://hackclub.com/slack"
            target="_blank"
            sx={{ color: 'pink' }}
          >
            Hack Club Slack
          </Text>. We've emailed you with all the instructions you'll need.
        </Box>
      </Card>
    </Container>
  )
}
