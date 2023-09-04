import Joi from 'joi'

const approveOptionRegex = /^Si|No$/i

const approvementSchema = Joi.object({
  observations: Joi.string().required(),
  approveOption: Joi.string().required().pattern(approveOptionRegex)
})

export const checkApprovementData = async (payload) => {
  try {
    await approvementSchema.validateAsync(payload)
    return true
  } catch (error) {
    throw new Error(error.message)
  }
}
