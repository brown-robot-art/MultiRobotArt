from crazyflie_py import Crazyswarm 
from generate_trajectory import generate_trajectory, plot_trajectory
from generate_trajectory.uav_trajectory import Trajectory
from curves_to_trajectory.curves import *
import matplotlib.pyplot as plt
import numpy as np

# noinspection PyShadowingNames
def main():
    swarm = Crazyswarm()
    timeHelper = swarm.timeHelper
    allcfs = swarm.allcfs

    # TODO: Edit the following line to change the curve
    # fx, fz = circle_facing_constant((1, 0), 10)
    fx, fy, fz = helix((1, 0), 10, 1)
    flight_time = 10

    load_data = False 

    if load_data:
        # Method 1: Load the trajectory from a file
        traj = Trajectory()
        print("Loading trajectory")
        traj.loadcsv('data/rose1_traj.csv')
    else:
        # Method 2: Generate the trajectory from the curve
        print("Generating Position Data")
        data = generate_trajectory.generate_position_data(fx=fz, fy=fx, fz=fy,
                                                domain=(0, flight_time),
                                                output='pos.csv')
        print("Computing trajectory")
        traj = generate_trajectory.generate_trajectory_from_file('pos.csv',
                                                                num_pieces=12,
                                                                approx=False)
        traj.savecsv('traj.csv')


    plot_trajectory.plot(traj)
    print("Beginning CF execution")
    for cf in allcfs.crazyflies:
        cf.uploadTrajectory(0, 0, traj)

    timeHelper.sleep(2.0)
    # for cf in allcfs.crazyflies:
    #     cf.setLEDColor(0, 1, 0)
    allcfs.takeoff(targetHeight=1.5, duration=2.)

    timeHelper.sleep(4.0)
    # for cf in allcfs.crazyflies:
    #     cf.setLEDColor(1, 0, 0)
    allcfs.startTrajectory(0, timescale=1.0)

    timeHelper.sleep(traj.duration * 1.0 + 2.0)
    # for cf in allcfs.crazyflies:
    #     cf.setLEDColor(0, 1, 0)
    allcfs.land(targetHeight=0.04, duration=2.0)


if __name__ == "__main__":
    main()
