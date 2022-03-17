local json = require("scripts.json")

local outputDir = 'src/lib/gameInfo'

function dirLookup(dir)
  local files = {}
  local p = io.popen('find "'..dir..'" -type f')
  for file in p:lines() do
      table.insert(files, file)
  end
  return files
end

function getFirstLineOfFile(filePath)
  local f = assert(io.open(filePath, "rb"))
  for l in f:lines() do
    return l
  end
end

function returnVariableName(line)
  if line == nil then
    return false
  end
  local spaceCharacter = line:find(' ')
  if spaceCharacter == nil or spaceCharacter == '' then
    return false
  end
  return line:sub(1, line:find(' ') - 1)
end

function readGetFirstLineAndReturnVariableName(filePath)
  local line = getFirstLineOfFile(filePath)
  return returnVariableName(line)
end

function convertToJsonAndSaveToFile(filePath, table)
  local file = io.open(filePath, "w")

  if file then
      local contents = json.encode(table)
      file:write( contents )
      io.close( file )
      return true
  else
      return false
  end
end

local files = dirLookup('information-source/src/lang/value')

for i = table.maxn(files), 1, -1 do
  print(files[i])
  local variableName = readGetFirstLineAndReturnVariableName(files[i])
  local filePath = files[i]:gsub(".lua", ""):gsub("/", ".")
  local fileName = (outputDir .. files[i]:sub(files[i]:match'^.*()/')):gsub(".lua", ".json")
  if variableName then
    print(variableName)
    print(fileName)
    require(filePath)
    convertToJsonAndSaveToFile(fileName, _G[variableName])
  end
  -- break
end
