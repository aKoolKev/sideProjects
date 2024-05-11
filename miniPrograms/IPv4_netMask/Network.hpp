//Author: Kevin Dong
//Date: 5/11/24
/*Purpose: Define the Network class. Given a network mask and an IPv4 address,
           it can display information about the network mask and the host id
           and network id of the address.
*/

#ifndef _NETWORK_HPP_
#define _NETWORK_HPP_

#include <iostream>

class Network
{
private:
    std::string _netMask; // in binary
    std::string _address; // in binary

    int _hostBits;
    int _networkBits;
    int _addressLen;

    int _setOfDecimal; //help calculate _addressLen;

public:
    //default constructor
    Network(std::string netMask, std::string address);

    //returns binary equivalence given base 10 number
    std::string decimal2Binary(std::string decimalNum);

    //converts binary values to decimal values
    std::string binary2Decimal(std::string binaryNum);

    //returns binary equivalence and set the address length
    std::string toBinary(std::string str, bool isAddress);

    //ensures binary number is in sets of 8
    std::string appendMissingZeros(std::string &binaryNum);

    //prints out the amount of host bits and host amount
    void getNetMaskInfo();
    
    //gets the network ID given address
    std::string getNetworkID();
    
    //gets the host ID given address
    std::string getHostID();

    //nicely format host ID
    std::string formatHostID(std::string hostID);

};

#endif
