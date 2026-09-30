/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { ICheckboxGroupProps, ICheckboxOption } from '~/global/interfaces/interface'

const useCheckboxGroup = (defaultValues: any[] = []) => {
  const [selectedItems, setSelectedItems] = useState<any>(defaultValues)
  const [prevSelectedItems, setPrevSelectedItems] = useState<any>(defaultValues)

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value)
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value)
      setSelectedItems(remaining)
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value])
    }
  }

  return { selectedItems, handleSelect, prevSelectedItems, setPrevSelectedItems }
}

const InputCheckboxForm = <TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  options,
  defaultValues,
  onSelectionChange
}: ICheckboxGroupProps<TFieldValues> & { onSelectionChange: (selectedItems: string[]) => void }) => {
  const { setValue } = useForm()
  const { selectedItems, handleSelect, prevSelectedItems, setPrevSelectedItems } = useCheckboxGroup(defaultValues)

  useEffect(() => {
    if (name && JSON.stringify(selectedItems) !== JSON.stringify(prevSelectedItems)) {
      setValue(name, selectedItems)
      onSelectionChange(selectedItems)
    }
    setPrevSelectedItems(selectedItems)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems, setValue, name, onSelectionChange, prevSelectedItems])

  return (
    <FormControl size={'small'} variant={'outlined'}>
      <FormLabel component='legend'>{label}</FormLabel>
      <div>
        {options.map((option: ICheckboxOption) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name || option.value}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        {...field}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    )
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          )
        })}
      </div>
    </FormControl>
  )
}

export default InputCheckboxForm
