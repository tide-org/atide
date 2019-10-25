import os
from time import sleep


def try_run_tide():
    try:
        import tide
        from tide import Tide
        tide_path = os.path.abspath(tide.__file__)
        tide_instance = Tide()
        tide_instance.start()
    except Exception as ex:
        error_file_path = os.path.abspath(__file__) + ".error.log"
        file_handle = open(error_file_path, "w+")
        file_handle.write("Exception handled running start-tide: \n\t" + str(ex))
        file_handle.close()
 
if __name__ == "__main__":
    try_run_tide()
