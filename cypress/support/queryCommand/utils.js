/// <reference types = "cypress"/>

export const getFeildData = (fields, resultData)=> {
    return fields.map(categoryName=> {
        const columns = resultData.find(columns=> columns.Field === categoryName)
        return columns || null 
    })

}

export const getFieldsAttribute = (attributeName, columns) => {
    const column = columns.find(col => col.Field === attributeName);
    return column ? column[attributeName] : null;
  };