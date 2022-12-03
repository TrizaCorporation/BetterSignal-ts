export interface BetterSignalConnectionType {
    Callback?: Callback,
    Disconnect?: Callback
  }
  
  export default class BetterSignalConnection {
    Callback?: Callback
    constructor(Callback: Callback){
      this.Callback = Callback
    }
  
    Disconnect(){
      this.Callback = undefined
      setmetatable(this, {})
    }
  }