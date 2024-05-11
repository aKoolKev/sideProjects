#include <iostream>
#include "Network.hpp"

using namespace std;

int main(int argc, char* argv[])
{
    //prompt user for IPv4 net mask and address
    string netMask, address;   
     
    cout << "Enter IPv4 net mask: ";
    cin >> netMask;

    cout << "Enter IPv4 address: ";
    cin >> address; 

    //create and pass in the info
    Network myNetwork(netMask, address);

    cout << endl; // formatting
    
    //can get info about the provided netmask
    myNetwork.getNetMaskInfo();

    //get the host id and network id of given address and mask
    string hostID = myNetwork.getHostID();
    string networkID = myNetwork.getNetworkID();

    cout << "hostID: " << hostID << endl;
    cout << "networkID: " << networkID << endl;

    return 0;
}
