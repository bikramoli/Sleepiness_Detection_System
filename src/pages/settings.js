/** @jsx jsx */
import {
  Box,
  Grid,
  jsx,
  Heading,
  Text,
  Input,
  Flex,
  Button,
  Label,
  Checkbox,
} from 'theme-ui'
import { navigate } from 'gatsby'
import { useSettingsInfo } from '../context/settings.context'
import { useCallback } from 'react'
import { useState } from 'react'
import { fadeInUp, staggerAnimation } from '../animation/animations'
import { motion } from 'framer-motion'

const SettingsCardNumeric = ({
  title,
  description,
  min,
  max,
  step,
  defaultValue,
  onChange,
  ...props
}) => {
  return (
    <Flex
      sx={{
        p: 4,
        bg: 'text',
        color: 'background',
        borderRadius: 'default',
        alignItems: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Heading
          as='h1'
          sx={{
            fontSize: 5,
          }}
        >
          {title}
        </Heading>
        <Text
          sx={{
            fontSize: 3,
            mt: 1,
          }}
        >
          {description}
        </Text>
        <Input
          type='number'
          defaultValue={defaultValue}
          min={min}
          max={max}
          step={step}
          onChange={onChange}
          sx={{
            mt: 3,
            width: '100%',
          }}
        />
      </Box>
    </Flex>
  )
}

const SettingsCardInputCheckmark = ({
  title,
  description,
  placeholder,
  onInputChange,
  onCheckChange,
  enabled,
  inputValue,
  ...props
}) => {
  const [checked, setChecked] = useState(enabled)

  const onCheck = useCallback(() => {
    onCheckChange(!checked)
    setChecked(!checked)
  }, [checked, onCheckChange])

  return (
    <Flex
      sx={{
        p: 4,
        bg: 'text',
        color: 'background',
        borderRadius: 'default',
        alignItems: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Heading
          as='h1'
          sx={{
            fontSize: 5,
          }}
        >
          {title}
        </Heading>
        <Text
          sx={{
            fontSize: 3,
            mt: 1,
          }}
        >
          {description}
        </Text>
        <Label mt={2}>
          <Checkbox
            checked={checked}
            onChange={() => {
              onCheck()
            }}
          />
          Enabled
        </Label>
        <Input
          value={inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          sx={{
            mt: 3,
            width: '100%',
          }}
        />
      </Box>
    </Flex>
  )
}

const SettingsCardCheckmark = ({
  title,
  description,
  placeholder,
  onCheckChange,
  enabled,
  inputValue,
  ...props
}) => {
  const [checked, setChecked] = useState(enabled)

  const onCheck = useCallback(() => {
    onCheckChange(!checked)
    setChecked(!checked)
  }, [checked, onCheckChange])

  return (
    <Flex
      sx={{
        p: 4,
        bg: 'text',
        color: 'background',
        borderRadius: 'default',
        alignItems: 'center',
      }}
      {...props}
    >
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Heading
          as='h1'
          sx={{
            fontSize: 5,
          }}
        >
          {title}
        </Heading>
        <Text
          sx={{
            fontSize: 3,
            mt: 1,
          }}
        >
          {description}
        </Text>
        <Label mt={2}>
          <Checkbox
            checked={checked}
            onChange={() => {
              onCheck()
            }}
          />
          Enabled
        </Label>
      </Box>
    </Flex>
  )
}

const SettingsPage = () => {
  const {
    earThreshold,
    maxFPS,
    frameLookback,
    sendAlertToEnabled,
    sendAlertToURI,
    carSpeedCheckEnabled,
    carSpeedCheckURI,
    bruhShiJianEnabled,
    setEarThreshold,
    setMaxFPS,
    setFrameLookback,
    setSendAlertToEnabled,
    setSendAlertToURI,
    setCarSpeedCheckEnabled,
    setCarSpeedCheckURI,
    setBruhShiJianEnabled,
  } = useSettingsInfo()

  return (
    <motion.div
      initial='initial'
      animate='animate'
      variants={staggerAnimation}
      sx={{
        p: 5,
      }}
    >
      <motion.div variants={fadeInUp()}>
        <Button
          onClick={() => {
            navigate('/')
          }}
        >
          Go Back
        </Button>
        <Heading
          as='h1'
          sx={{
            mt: 3,
            fontSize: 7,
          }}
        >
          Settings
        </Heading>
      </motion.div>
      <motion.div variants={fadeInUp()}>
        <Heading
          as='h2'
          sx={{
            mt: 2,
            color: 'rgba(120,120,120,1)',
          }}
        >
          Adjust parameters for sleepiness detection and alerts
        </Heading>
      </motion.div>

      <motion.div variants={fadeInUp()}>
        <Grid
          sx={{
            mt: 4,
          }}
          columns={[1, 2, 3]}
        >
          <SettingsCardNumeric
            title='Eye'
            description='Adjusts eye ratio: smaller values will lead to better results
                for people with smaller eyes. Values go from 0-1.'
            min={0}
            max={1}
            step={0.05}
            defaultValue={earThreshold}
            onChange={(e) => {
              setEarThreshold(e.target.value)
            }}
          />
          <SettingsCardNumeric
            title='FPS'
            description='Adjusts the rate at which it checks your level of focus. 
                This is capped by hardware performance, so it may not reach this number. Values go from 0-30 FPS.'
            min={0}
            max={30}
            step={1}
            defaultValue={maxFPS}
            onChange={(e) => {
              setMaxFPS(e.target.value)
            }}
          />
          <SettingsCardNumeric
            title='Frame Lookback'
            description='Number of frames for the rolling average of the left and right EAR. More frames reduces error, although may be slower to detect Sleepiness. Values go from 0-100.'
            min={0}
            max={100}
            step={5}
            defaultValue={frameLookback}
            onChange={(e) => {
              setFrameLookback(e.target.value)
            }}
          />
          <SettingsCardInputCheckmark
            title='Send Alert To'
            description='Sends a GET request to the given endpoint if a user is sleepy. May be helpful to signal self-driving cars to take over. Proper auth is TODO.'
            placeholder='http://localhost/alertdriver'
            enabled={sendAlertToEnabled}
            onCheckChange={(e) => {
              setSendAlertToEnabled(e)
            }}
            inputValue={sendAlertToURI}
            onInputChange={(e) => {
              setSendAlertToURI(e.target.value)
            }}
          />
          <SettingsCardInputCheckmark
            title='Car Speed Check'
            description='Makes a GET request to the given endpoint if a car is running ({"running": true}). If the car is not running, the alert system will be inactive.'
            placeholder='http://localhost/getcarstatus'
            enabled={carSpeedCheckEnabled}
            onCheckChange={(e) => {
              setCarSpeedCheckEnabled(e)
            }}
            inputValue={carSpeedCheckURI}
            onInputChange={(e) => {
              setCarSpeedCheckURI(e.target.value)
            }}
          />
          <SettingsCardCheckmark
            title='Location'
            description={`Find Your current location while your are driving`}
            enabled={bruhShiJianEnabled}
            onCheckChange={(e) => {
              setBruhShiJianEnabled(e)
            }}
          />
        </Grid>
      </motion.div>
    </motion.div>
  )
}

export default SettingsPage
