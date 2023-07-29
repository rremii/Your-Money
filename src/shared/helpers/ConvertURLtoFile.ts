export const ConvertURLtoFile = async (url: string) => {
  const response = await fetch(url)
  const data = await response.blob()
  const ext = data.type.split("/").pop()
  const filename = url.split("/").pop() + "." + ext
  const metadata = { type: data.type }
  return new File([data], filename, metadata)
}