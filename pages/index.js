import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Textarea,
  Field,
  Grid
} from 'theme-ui'
import Icon from '@hackclub/icons'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { manifest, requiredList } from '../lib/manifest.js'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Register() {
  const [data, setData] = useState({})
  const [disabled, setDisabled] = useState(false)
  const router = useRouter()
  useEffect(() => {
    setData({ Name: router.query.name, Email: router.query.email })
  }, [router])
  return (
    <>
      <ToastContainer align="right" />
      <Grid columns={[1, `3fr 2fr`]}>
        <Card
          px={[4, 4]}
          py={[4, 4]}
          sx={{
            background: [
              `linear-gradient(40deg, rgba(255,71,148,0.55) 0%, rgba(214,58,249,0.45) 100%), linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%)`,
              `linear-gradient(40deg, rgba(255,71,148,0.55) 0%, rgba(214,58,249,0.45) 100%), linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4965161064425771) 20%, rgba(0,0,0,0.2987570028011205) 100%)`
            ]
          }}
        >
          <Box sx={{ display: ['block', 'flex'], alignItems: 'center', mb: 3 }}>
            <Flex sx={{ alignItems: 'center', flexGrow: 1 }}>
              <Text
                variant="subheadline"
                sx={{
                  fontWeight: 900,
                  mb: 0,
                  flexGrow: 1,
                  ml: 2,
                  textAlign: 'left',
                  fontSize: 5,
                  color: 'white'
                }}
                as="div"
              >
                Join us for{' '}
                <Text
                  sx={{
                    textDecoration: 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => window.open('https://epoch.hackclub.com')}
                >
                  Epoch
                </Text>
              </Text>
            </Flex>

            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                cursor: 'pointer',
                '> svg': { display: ['none', 'inline'] },
                mt: [2, 0]
              }}
              onClick={() => poster()}
            ></Box>
          </Box>
          <Box mb={3}>
            <Image
              src="https://cloud-i6gnfmcit-hack-club-bot.vercel.app/0hack_club_assemble_ltnj_02693-min.jpg"
              width="auto"
              sx={{ display: ['block', 'none'], borderRadius: 4 }}
            />
          </Box>
          <Box bg="elevated" p={3} mb={3} sx={{ borderRadius: 3 }}>
            [Slack Announcement] Feel free to contact{' '}
            <a href="mailto:epoch@hackclub.com">epoch@hackclub.com</a> for help!
          </Box>

          {manifest.questions.map((sectionItem, sectionIndex) => {
            if (typeof sectionItem.check != 'undefined') {
              if (sectionItem.check(data)) {
                return null
              }
            }
            return (
              <Box
                key={sectionIndex}
                sx={{
                  mb: sectionIndex == manifest.questions.length - 1 ? 4 : 5,
                  mt: sectionIndex == 0 ? 4 : 5
                }}
              >
                <Box sx={{ textAlign: 'left', mb: 2 }}>
                  <Text
                    sx={{
                      color: 'white',
                      fontSize: '27px',
                      fontWeight: 800,
                      textDecoration: 'underline'
                    }}
                  >
                    {sectionItem['header']}
                  </Text>
                </Box>
                <Box>
                  {sectionItem.label && (
                    <Box sx={{ color: 'smoke', mb: 3, fontSize: '18px' }}>
                      {sectionItem['label']}
                    </Box>
                  )}
                  {sectionItem.items.map((item, index) => {
                    if (typeof item.check != 'undefined') {
                      if (item.check(data)) {
                        return null
                      }
                    }
                    return (
                      <Box
                        mt={1}
                        mb={4}
                        key={'form-item-' + sectionIndex + '-' + index}
                      >
                        <Field
                          label={
                            <>
                              <Text
                                mb={item.sublabel ? 1 : 2}
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  fontWeight: '600'
                                }}
                              >
                                {item['label']}{' '}
                                <Text
                                  sx={{
                                    display: item.optional ? 'inline' : 'none',
                                    opacity: 0.4
                                  }}
                                >
                                  (Optional)
                                </Text>
                              </Text>
                              {item.sublabel && (
                                <Text
                                  sx={{
                                    color: 'smoke',
                                    fontWeight: '300',
                                    mb: 2,
                                    fontSize: '16px'
                                  }}
                                  as="p"
                                >
                                  {item['sublabel']}
                                </Text>
                              )}
                            </>
                          }
                          onChange={e => {
                            let newData = {}
                            newData[item.key] = e.target.value
                            setData({ ...data, ...newData })
                          }}
                          placeholder={item['placeholder']}
                          as={
                            item.type == 'string'
                              ? Input
                              : item.type == 'paragraph'
                              ? Textarea
                              : item.inputType == 'checkbox'
                              ? Input
                              : Select
                          }
                          type={item.inputType}
                          required={!item.optional}
                          value={
                            data[item.key] !== undefined ? data[item.key] : ''
                          }
                          sx={{
                            border: '1px solid',
                            borderColor: 'rgb(221, 225, 228)',
                            bg: 'rgba(0,0,0,0)',
                            resize: 'vertical',
                            display:
                              item.inputType == 'checkbox'
                                ? '-webkit-box'
                                : 'block'
                          }}
                          {...(item.type == 'select'
                            ? item.options
                              ? {
                                  children: (
                                    <>
                                      <option value="" disabled>
                                        Select One
                                      </option>
                                      {item['options'].map(option => (
                                        <option key={option}>{option}</option>
                                      ))}
                                    </>
                                  )
                                }
                              : {
                                  children: <></>
                                }
                            : {})}
                        />
                      </Box>
                    )
                  })}
                </Box>
              </Box>
            )
          })}
          <Button
            onClick={() => {
              setDisabled(true)
              toast.notify('Submitting your registration...', {
                duration: 60,
                title: 'Working...'
              })
              console.log(data)
              fetch('/api/submit', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then(response => response.json())
                .then(({ success, error }) => {
                  setDisabled(false)
                  success
                    ? window.location.replace('/success')
                    : toast.notify(error, {
                        type: 'error',
                        title: 'Oops!',
                        duration: 60
                      })
                })
            }}
            style={{
              filter: disabled ? 'grayscale(1)' : 'grayscale(0)'
            }}
            disabled={disabled}
          >
            Submit
          </Button>
        </Card>
      </Grid>
    </>
  )
}
