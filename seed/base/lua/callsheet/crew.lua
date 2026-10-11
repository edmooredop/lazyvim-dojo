local M = {}

---@class CrewMember
---@field name string
---@field role string
---@field prep integer minutes before unit call

---@return CrewMember[]
function M.load()
  return {
    { name = "Ana", role = "DP", prep = 45 },
    { name = "Sol", role = "Gaffer", prep = 60 },
    { name = "Kit", role = "Sound", prep = 30 },
  }
end

---@param m CrewMember
---@return number
function M.day_rate(m)
  return m.rate * 10
end

return M
