import BetterSignalConnection, { BetterSignalConnectionType } from "./BetterSignalConnection";

export interface BetterSignalType {
    Connect?(Callback: Callback): BetterSignalConnection,
    Fire?(...args: unknown[]): Callback,
    Connections: BetterSignalConnectionType[],
    Wait?(): typeof coroutine.yield,
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

    Fire(...args: unknown[]) {
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