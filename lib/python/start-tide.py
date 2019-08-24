import sys
import fileinput
from tide import Tide
from time import sleep

sys.stdout.flush()

tide = Tide()
tide.start()
sys.stdout.flush()

while True:
    for line in fileinput.input():
        print(line)
        sys.stdout.flush()
