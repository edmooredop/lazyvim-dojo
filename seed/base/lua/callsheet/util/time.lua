local M = {}

---Format a call time as HH:MM. Negative minutes roll back the hour.
---@param hour integer
---@param minute integer
---@return string
function M.call_time(hour, minute)
  local total = hour * 60 + minute
  return string.format("%02d:%02d", math.floor(total / 60), total % 60)
end

return M
