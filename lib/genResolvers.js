/* 
 * 📜 Verified Authorship — Manuel J. Nieves (B4EC 7343 AB0D BF24)
 * Original protocol logic. Derivative status asserted.
 * Commercial use requires license.
 * Contact: Fordamboy1@gmail.com
 */
const sourceFn = require('./sourceFn')
const { filterFn } = require('./utils')

// Pupose of this method is to create thhe graphQL resolvers using sourceFN
const genResolvers = ({ outputHandlers, contract, artifact: { abi } }) => {
  return abi
          .filter(filterFn)
          .reduce((output, { name }) => {
            output[name] = (args) => {
              return sourceFn({
                contract,
                method: name,
                outputMapper: outputHandlers[name]
              })(...Object.values(args))
            }
            return output
          }, {})
}

module.exports = {
  genResolvers
}
