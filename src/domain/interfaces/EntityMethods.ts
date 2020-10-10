export interface EntityMethods{
 update(filename: string, element: this): Promise<void>
 save(filename: string, element: this): Promise<this>
 delete(filename: string, element: this): Promise<void>
}
