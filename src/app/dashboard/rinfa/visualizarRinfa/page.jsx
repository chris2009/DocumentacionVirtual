import React from 'react'
import executeQuery from '../../../../libs/mysql'

export default function visualizaDocumento() {
  const result = executeQuery("select * from tbl_escalafon", [])
  return (
    <div>
      {JSON.stringify(result)}
    </div>
  )
}
