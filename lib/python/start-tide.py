import os
from time import sleep
import traceback
import sys


def try_run_tide():
    try:
        import tide
        from tide import Tide
        tide_path = os.path.abspath(tide.__file__)
        tide_instance = Tide()
        tide_instance.start()
    except Exception as ex:
        running_file = sys.argv[0]
        pathname = os.path.dirname(running_file)
        running_path = os.path.abspath(pathname)
        error_file_path = os.path.abspath(__file__) + ".error.log"
        file_handle = open(error_file_path, "w+")
        file_handle.write("Running path: " + running_path)
        file_handle.write("\n\nGroups and Users:")
        file_handle.write("\n  Effective group id:     " + str(os.getegid()))
        file_handle.write("\n  Effective user id:      " + str(os.geteuid()))
        file_handle.write("\n  Real group id:          " + str(os.getgid()))
        file_handle.write("\n  Supplemental group ids: " + str(os.getgroups()))
        file_handle.write("\n\nException handled running start-tide: \n\t" + str(ex))
        file_handle.write("\n  Traceback: \n\t" + traceback.format_exc())
        file_handle.close()
 
if __name__ == "__main__":
    try_run_tide()
