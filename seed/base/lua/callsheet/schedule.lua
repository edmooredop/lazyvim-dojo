local time = require("callsheet.util.time")

local M = {}

---@class CallSheet
---@field day integer
---@field unit_call string
---@field crew { name: string, call: string }[]

---Build the call sheet for one shoot day.
---@param day integer
---@param crew CrewMember[]
---@return CallSheet
function M.build(day, crew)
  local unit_call = time.call_time(7, 30)
  local rows = {}
  for _, m in ipairs(crew) do
    table.insert(rows, { name = m.name, call = time.call_time(7, 30 - m.prep) })
  end
  return { day = day, unit_call = unit_call, crew = rows }
end

return M
