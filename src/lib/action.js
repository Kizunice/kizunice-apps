

export const handleDelete = async (value, api) => {
  const approval = confirm("Apakah kamu yakin ingin menghapus?")
  if (approval) {
      await fetch(`/api/${api}`, {
          method: "DELETE",
          body: JSON.stringify(value),
          headers: {
            "Content-Type": "application/json",
          },
      })
      location.reload()
  }
}

