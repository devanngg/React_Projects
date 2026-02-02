exports.hideIp = (ip) =>{
    const octets = ip.split(".");
    if(octets.length  !==4) return ip; //Only IPv4 handled

    return `${octets[0]}.***.***.***`;
}