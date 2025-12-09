@echo off
echo Cleaning up project...

REM Remove build artifacts
rmdir /s /q dist 2>nul
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul

REM Remove compiled JS files from src
for /r src %%f in (*.js) do del "%%f" 2>nul
for /r src %%f in (*.jsx) do del "%%f" 2>nul

REM Remove dist folders inside src
for /r src /d %%d in (dist) do rmdir /s /q "%%d" 2>nul

REM Remove TypeScript declaration files if any
for /r src %%f in (*.d.ts) do del "%%f" 2>nul

echo Cleanup complete!
echo Now run: npm install && npm run dev