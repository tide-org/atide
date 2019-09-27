import os
from time import sleep

try:
    import tide
    from tide import Tide

    tide_path = os.path.abspath(tide.__file__)

    print("TIDE SOURCE PATH: " + tide_path)

    sleep(1)

    tide = Tide()
    tide.start()
except Exception as e:
    script_path = os.path.abspath(__file__)
    error_file_path = script_path + ".error.log"
    file_handle = open(error_file_path, "w+")
    file_handle.write("Exception handled running start-tide: " + str(e))
    file_handle.close()
  
