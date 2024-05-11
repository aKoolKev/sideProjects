//Author: Kevin Dong
//Date: 5/11/24
/*Purpose: Implementation of the Network class.
*/

#include "Network.hpp"

using namespace std;

//default constructor
Network::Network(std::string netMask, std::string address)
{
    //convert netMask and address to binary equivalence
    _netMask = toBinary(netMask, false);
    _address = toBinary(address, true);
}

//returns binary equivalence and set the address length
string
Network::toBinary(string str, bool isAddress)
{
    string binaryNum;
    string decimalNum;

    for (int i=0; i<=str.length();i++)
    {
        if (str[i] != '.' && str[i] != '\n')
            decimalNum += str[i];
        else
        {
            binaryNum += decimal2Binary(decimalNum);

            if (isAddress)
                _setOfDecimal++; //count number of decimal

            decimalNum = ""; //clear
        }
    }
    binaryNum += decimal2Binary(decimalNum); //convert the last set of decimal

    //compute address length
    if (isAddress)
    {
        _setOfDecimal++;
        _addressLen = _setOfDecimal * 8;
    }

    return binaryNum;
}

//converts binary values to decimal values
string 
Network::binary2Decimal(string binaryNum)
{
    int decimalNum = 0;

    //base expansion
    for(int index=0, power = binaryNum.length()-1; index < binaryNum.length(); index++, power--)
    {
        if (binaryNum[index] == '1')
            decimalNum += pow(2,power);
    }

    return to_string(decimalNum);
}

//returns binary equivalence given base 10 number
string
Network::decimal2Binary(string decimalNum)
{
    //base case: no conversion necessary
    if (stoi(decimalNum) == 0)
        return "00000000";


    string binaryNum;
    int base = 2;
    int remainder = -1;
    int quotient = stoi(decimalNum);


    //repeated divison
    while (quotient!=0)
    {
        remainder = quotient%base;
        quotient /= base;
        binaryNum += to_string(remainder);
    }


    //make sure binary number is multiple of 8
    appendMissingZeros(binaryNum);


    //reverse result to get binary number using two pointer approach
    for (int start = 0, end = binaryNum.length()-1; start<end; start++, end--)
        swap(binaryNum[start], binaryNum[end]);


    return binaryNum;
}

//ensures binary number is in sets of 8
string
Network::appendMissingZeros(string &binaryNum)
{
    // don't need zeros
    if (binaryNum.length()%8 == 0)
        return binaryNum;

    // append missing zeros
    int missingZero = 8-(binaryNum.length()%8);
    for (int i=0; i<missingZero; i++)
        binaryNum += "0";

    return binaryNum;
}

//prints out the amount of host bits and host amount
void
Network::getNetMaskInfo()
{
    //host info
    for (int i=0; i < _netMask.length();i++)
        if (_netMask[i]=='0')
            _hostBits++;

    cout << "host bit(s): " << _hostBits << endl;
    cout << "host amount: " << pow(2,_hostBits) << " host(s)" << endl;


    //network info
    _networkBits = _addressLen - _hostBits;
    
    cout << "network bit(s): " << _networkBits << endl;
    cout << "network amount: " << pow(2,_networkBits) << " network(s)" << "\n\n";
}

//gets the network ID given address
string
Network::getNetworkID()
{
    string networkIDBinary;
    string networkID;
    int counter = 0;

    for (int i=0; i < _networkBits; i++)
    {
        networkIDBinary += _address[i];
        counter++;

        //format
        if (counter == 8)
        {
            networkID += binary2Decimal(networkIDBinary);
            if (i+1 <_networkBits)
                networkID += '.';

            networkIDBinary = ""; //clear it for next 8
            counter = 0; //reset counter
        }
    }
    //handle last batch
    if (counter != 0)
        networkID += binary2Decimal(networkIDBinary); 

    return networkID;
}

//gets the host ID given address
string
Network::getHostID()
{
    string hostID;

    for (int i=_addressLen - _hostBits; i< _addressLen; i++)
        hostID += _address[i];

    return formatHostID(binary2Decimal(hostID));
}

//nicely format host ID
string
Network::formatHostID(string hostID)
{
    double counter = (_addressLen - _hostBits)/8;

    string hostID_head;
    for (int i=0; i<counter; i++)
        hostID_head += "0.";
    
    return (hostID_head + hostID);
}
