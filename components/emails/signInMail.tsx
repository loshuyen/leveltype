import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface MagicLinkMailProps {
  magicLink?: string;
}

const MagicLinkMail = ({
  magicLink,
}: MagicLinkMailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>以連結登入LevelType</Preview>
      <Container style={container}>
        <Heading style={heading}>登入</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
                點擊此連結登入
            </Link>
          </Text>
          <Text style={paragraph}>
            如果您沒有嘗試登入LevelType，請忽略此郵件。
          </Text>
        </Section>
        <Hr style={hr} />
        <Img
          src='https://leveltype.site/logo.png'
          width={32}
          height={32}
          alt="LevelType Logo"
        />
        <Text style={footer}>LevelType</Text>
        <Text style={footer}>
            這是一封自動發送的郵件，請不要直接回覆。
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MagicLinkMail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 25px 48px',
  backgroundImage: 'url("/static/raycast-bg.png")',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat, no-repeat',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const body = {
  margin: '24px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const link = {
  color: '#FF6363',
};

const hr = {
  borderColor: '#dddddd',
  marginTop: '48px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  marginLeft: '4px',
};