import traceback
import logging
import fileinput

for line in fileinput.input():
    try:
        print("<stdin>")
        print(line)
        print("</stdin>")
        print("<stdout>")
        exec(line)
        print("</stdout>")
    except Exception as e:
        print("<exception>")
        print(traceback.format_exc())
        print("</exception>")
