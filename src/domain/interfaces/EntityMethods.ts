export interface EntityMethos{
 update(filename: string, account: this): Promise<void>
 save(filename: string, account: this): Promise<void>
 delete(filename: string, account: this): Promise<void>
 findById(filename: string, account: this): Promise<this | any>
 findAll(filename: string, account: this): Promise<Array<this | any>>
}
