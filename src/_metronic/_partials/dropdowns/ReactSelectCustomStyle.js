/*export const customSelectStyle = {
    control: (provided, { isSelected, isFocused }) => ({
        ...provided,
        borderColor: (isSelected || isFocused) ? '#41C78F' : '#E4E6EF',
        '&:hover': {
            borderColor: '#41C78F'
        }  
    }),
    option: (provided, {isSelected, isFocused}) => ({
        ...provided,
        backgroundColor: (isSelected ? '#41C78F' : (isFocused ? '#E9F8F1' : '#FFF')),
    })
}*/

export const customSelectStyle = theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
      ...theme.colors,
      primary25: '#E9F8F1',
      primary: '#41C78F',
    },
  });