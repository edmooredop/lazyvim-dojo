package.path = "lua/?.lua;" .. package.path

local schedule = require("callsheet.schedule")

local sheet = schedule.build(1, {})
assert(sheet.unit_call == "07:30", "unit call should be 07:30")
print("ok  unit call is 07:30")
