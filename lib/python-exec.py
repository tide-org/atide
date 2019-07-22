import fileinput

for line in fileinput.input():
    print("<stdin>" + line + "<stdin>")
    print("<stdout>")
    exec(line)
    print("<stdout>")
