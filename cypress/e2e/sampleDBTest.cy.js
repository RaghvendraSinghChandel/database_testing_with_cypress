/// <reference types="cypress" />
import * as query from "../fixtures/query.json"
import { getFeildData } from "../support/queryCommand/utils"
import { getFieldsAttribute } from "../support/queryCommand/utils"

describe("test column from sales database",()=> {

  /**
   * Verify column length equal to 11 in sale table
   */
  it("Verify column length equal to 11",()=> {
    cy.database_query_to_fetch_result(query.fetchedColumnFromSaleTable).then((result)=> {
      const columns= result.map(column=> column.Field)
      expect(columns.length).to.equal(11)
    })


  })
  /**
   * Verify particual column present in sales table
   */

  it("verify category column present in sale table",()=> {
    cy.database_query_to_fetch_result(query.fetchedColumnFromSaleTable).then((result)=> {
      const columns= result.map(column=> column.Field)
      expect(columns).include("category")
    })
  })

  /**
   * This block is used to verify category column type in sale table
   */
  it("verify category column type is varchrar with 50 size",()=> {
    cy.database_query_to_fetch_result(query.fetchedColumnFromSaleTable).then((result)=> {
      const categoryColumnInfo = result.find(column => column.Field === 'category');
      expect(categoryColumnInfo.Type).to.equal("varchar(50)")
    })
  })

  /**
   * This block verify customer name, customer email and payment method field is nullable in sale table
   */
  it("verify customer name, customer email and payment method field is nullable",()=> {
    const givenFields = ["customer_name","customer_email","payment_method"]
    cy.database_query_to_fetch_result(query.fetchedColumnFromSaleTable).then((result)=> {
      const nullableFields = getFeildData( givenFields, result)
      for (let i = 0;i<3; i++) {
        expect(nullableFields[i].Null).to.eql("YES")
      }
      console.log("your nullable fileds is here", nullableFields)
    })
    

  })

  /**
   * Verify total number of row in a sell table
   */
  it("verify total number of row in cell table",()=> {
    cy.database_query_to_fetch_result(query.fetchedRowCountFromTable).then((rowCount)=> {
      expect(rowCount[0].rowCount).to.equal(20)
    })
  })

})