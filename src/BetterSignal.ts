import BetterSignalConnection, { BetterSignalConnectionType } from "./BetterSignalConnection";

export interface BetterSignalType {
    Connect?: Callback,
    Fire: Callback,
    Connections: BetterSignalConnectionType[]
}
  

export default class BetterSignal {
    Connections: BetterSignalConnectionType[]
    constructor(){
        this.Connections = []
    }
    
    Connect(Callback: Callback){
        let Connection = new BetterSignalConnection(Callback)
        this.Connections.push(Connection)
        return Connection
    }

    Fire(...args: []){
        for(const Connection of this.Connections){
            if (Connection.Callback){
                task.spawn(Connection.Callback, ...args)
            }
        }
    }

    Wait(){
        let WaitingCoroutine = coroutine.running()
        let Connection = this.Connect(function(){
            Connection.Disconnect()
            task.spawn(WaitingCoroutine)
        })
        return coroutine.yield()
    }
}