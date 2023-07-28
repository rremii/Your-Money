export const ConvertURLtoFile = async (url: string) => {
  const response = await fetch(url)
  const data = await response.blob()
  const filename = url.split("/").pop() // url 구조에 맞게 수정할 것
  const metadata = { type: `image/jpeg` }
  return new File([data], filename!, metadata)
}