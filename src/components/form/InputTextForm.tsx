import { useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Controller, FieldPath, FieldValues } from 'react-hook-form'
import { IFormInputProps } from '~/global/interfaces/interface'

const InputTextForm = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  type = 'text',
  sx,
  variant = 'outlined',
  multiline,
  rows,
  placeholder,
  disabled,
  required,
  startIcon,
  endIcon
}: IFormInputProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const currentType = isPassword ? (showPassword ? 'text' : 'password') : type

  const renderStartAdornment = () => {
    if (!startIcon) return undefined
    return (
      <InputAdornment position='start' sx={{ color: '#64748b' }}>
        {startIcon}
      </InputAdornment>
    )
  }

  const renderEndAdornment = () => {
    if (isPassword) {
      return (
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={() => setShowPassword((prev) => !prev)}
            edge='end'
            size='small'
            sx={{
              color: '#64748b',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'var(--primary-color, #e3964a)'
              }
            }}
          >
            {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small' />}
          </IconButton>
        </InputAdornment>
      )
    }

    if (endIcon) {
      return (
        <InputAdornment position='end' sx={{ color: '#64748b' }}>
          {endIcon}
        </InputAdornment>
      )
    }

    return undefined
  }

  return (
    <Controller
      name={name as FieldPath<TFieldValues>}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size='small'
          error={!!error}
          onChange={onChange}
          value={value ?? ''}
          fullWidth
          label={label}
          variant={variant}
          type={currentType}
          multiline={multiline}
          rows={rows}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          slotProps={{
            input: {
              startAdornment: renderStartAdornment(),
              endAdornment: renderEndAdornment()
            }
          }}
          sx={{
            width: '100%',
            // Outlined variant
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '& fieldset': {
                borderColor: '#e2e8f0',
                borderWidth: '1.5px',
                transition: 'border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary-color, #e3964a)'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary-color, #e3964a)',
                borderWidth: '1.5px'
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(227, 150, 74, 0.15)'
              },
              '&.Mui-error fieldset': {
                borderColor: '#ef4444'
              },
              '&.Mui-error.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)'
              }
            },
            // Standard variant (for backward compatibility)
            '& .MuiInput-root': {
              backgroundColor: 'transparent',
              transition: 'all 0.2s ease',
              '&:before': {
                borderColor: '#cbd5e1',
                borderBottomWidth: '1.5px',
                transition: 'border-color 0.2s ease'
              },
              '&:hover:not(.Mui-disabled):before': {
                borderColor: 'var(--primary-color, #e3964a)',
                borderBottomWidth: '2px'
              },
              '&:after': {
                borderColor: 'var(--primary-color, #e3964a)'
              }
            },
            // Label styling
            '& .MuiInputLabel-root': {
              color: '#64748b',
              fontWeight: 500,
              fontSize: '0.875rem',
              '&.Mui-focused': {
                color: 'var(--primary-dark-color, #dd8022)',
                fontWeight: 600
              },
              '&.Mui-error': {
                color: '#ef4444'
              }
            },
            // Input base text and Autofill override
            '& .MuiInputBase-input': {
              fontSize: '0.925rem',
              color: '#1e293b',
              padding: variant === 'outlined' ? '10px 14px' : undefined,
              '&::placeholder': {
                color: '#94a3b8',
                opacity: 1
              },
              '&:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0 100px #ffffff inset !important',
                WebkitTextFillColor: '#1e293b !important',
                caretColor: 'var(--primary-color, #e3964a)',
                borderRadius: 'inherit'
              },
              '&:-webkit-autofill:focus': {
                WebkitBoxShadow: '0 0 0 100px #ffffff inset !important'
              }
            },
            // Helper text
            '& .MuiFormHelperText-root': {
              marginLeft: '4px',
              marginTop: '4px',
              fontSize: '0.75rem',
              fontWeight: 500
            },
            ...sx
          }}
        />
      )}
    />
  )
}

export default InputTextForm
