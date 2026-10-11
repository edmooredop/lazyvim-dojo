package.path = "lua/?.lua;" .. package.path

local schedule = require("callsheet.schedule")
local crew = require("callsheet.crew")
local format = require("callsheet.util.format")

local day = tonumber(arg[1]) or 1

local sheet = schedule.build(day, crew.load())
print(format.sheet(sheet))
