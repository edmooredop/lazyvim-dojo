local M = {}

---Render a call sheet as plain text.
---@param sheet CallSheet
---@return string
function M.sheet(sheet)
  local lines = { ("DAY %d   UNIT CALL %s"):format(sheet.day, sheet.unit_call) }
  for _, c in ipairs(sheet.crew) do
    table.insert(lines, ("%s  %s"):format(c.call, c.name))
  end
  return table.concat(lines, "\n")
end

return M
