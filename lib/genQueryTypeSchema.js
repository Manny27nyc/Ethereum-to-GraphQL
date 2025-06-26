/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
const genType = ({ typeName, typeBody }) => {
  return `
  type ${typeName} {
    ${typeBody}
  }`
}
const typesToSchemaLine = (data) => {
  return data.types
              .map(type => `${type.name}: ${type.value}`)
              .reduce((out, cur, index) => {
                return (index === 0) ? `${out} ${cur}` : `${out} \n     ${cur}`
              }, '')
}

const topString =
`
  type Value {
    string: String
    int: Int
  }
  type Bytes {
    raw: String
    decoded: String
  }`

// Pupose of this method is to create the graphQL Schema
const genQueryTypeSchema = ({ queryConverter }) => {
  return queryConverter
          .map(item => {
            const typeName = `${item.name}` // function name = type name
            const typeBody = typesToSchemaLine(item)
            return genType({ typeName, typeBody })
          })
          .reduce((output, current) => {
            return output + current
          }, topString)
}

module.exports = {
  genQueryTypeSchema
}
