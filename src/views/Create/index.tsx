import { Input, Button, Modal, useModal, useToast } from '@pancakeswap/uikit'
import { useState, useEffect, useMemo } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { useWeb3React } from '@pancakeswap/wagmi'
import { getContract } from 'utils/contractHelpers'
import { useSigner } from 'wagmi'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import createFactory from 'config/abi/createFactory.json'
import axios from 'axios'
import {
  StylePageWrapper,
  StyleCreateContent,
  StyleH2,
  StyleUploadWrapper,
  StyleUpload,
  StyleCommon,
  StyleTitle,
  StyleH3,
  StyleH4,
  StyleSpan,
  StyleButtonWrap,
  Styledelete,
} from './styled'
import PropertiesModal from './components/PropertiesModal'
import SuccessModal from './components/SuccessModal'
import WaitModal from './components/WaitModal'

const CreatePage = () => {
  const factoryAddress = '0xD624FBf49142d53e4130CD8ded4c977E56DE894a'
  const { chainId } = useActiveWeb3React()
  const { account } = useWeb3React()
  const { data: signer } = useSigner()
  const [tokenId, setTokenId] = useState('')
  const pricePoolContract = useMemo(() => {
    return getContract({ abi: createFactory, address: factoryAddress, signer })
  }, [signer])
  useEffect(() => {
    console.log('pricePoolContract', pricePoolContract)
    if (pricePoolContract) {
      pricePoolContract
        .totalSupply()
        .then((result) => {
          setTokenId(result.toString())
        })
        .catch((err) => {
          setTokenId('')
        })
    }
  }, [pricePoolContract, account])
  const [nameText, setNameText] = useState('')
  const [supplyText, setSupplyText] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const { toastInfo, toastSuccess, toastError } = useToast()
  const { t } = useTranslation()
  const handlenameText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setNameText(value)
  }
  const handleSupplyText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setSupplyText(value)
  }
  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event
    setDescriptionText(value)
  }

  const [currencies, setCurrencies] = useState([{ trait_type: '', value: '' }])
  const handleCurrentcies = (list: any) => {
    setCurrencies(list)
  }
  const [onPresentModal] = useModal(<PropertiesModal currencies={currencies} handleCurrentcies={handleCurrentcies} />)

  const [preview, setpreview] = useState<any>('')
  const [formData, setFormData] = useState<any>('')
  const [isLoading, setIsoloading] = useState(false)
  const chooseFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    if (!file) {
      return
    }
    setFormData(file)
    if (/^image\/\S+$/.test(file.type)) {
      const src = URL.createObjectURL(file)
      setpreview(<img src={src} alt="" />)
    } else if (/^video\/\S+$/.test(file.type)) {
      const src = URL.createObjectURL(file)
      setpreview(<video src={src} autoPlay loop controls />)
    }
  }
  const [onSuccessModal] = useModal(<SuccessModal preview={preview} address={factoryAddress} tokenId={tokenId} />)
  const [onWaitModal, offWaitModal] = useModal(<WaitModal />, false)
  const ErrorText = (err: any) => {
    if (err && err.message) {
      let errObj = null
      try {
        errObj = JSON.parse(JSON.stringify(err))
      } catch {
        console.log('err')
      }
      if (errObj.reason) {
        return toastError(errObj.reason)
      }
      if (errObj.data && errObj.data.message) {
        return toastError(errObj.data.message)
      }
      if (errObj.error && errObj.error.data.message) {
        return toastError(errObj.error.data.message)
      }
      if (errObj.error && errObj.error.message) {
        return toastError(errObj.error.message)
      }
      return toastError(err.message)
    }
    if (err && err.data) {
      return toastError(err.data.message)
    }
    return toastError('fail')
  }
  const createFun = async () => {
    const form = new FormData()
    form.append('file', formData)
    form.append('name', nameText)
    form.append('description', descriptionText)
    form.append('attributes', JSON.stringify(currencies))
    setIsoloading(true)
    onWaitModal()
    axios({
      method: 'post',
      url: `https://nft.webxbank.pro/api/uploadToIPFS`,
      data: form,
      headers: {
        'Content-Type': 'multipart/form-data; application/json; charset=utf-8; ',
      },
    })
      .then((result) => {
        setIsoloading(false)
        offWaitModal()
        console.log('result', result)
        if (result?.data?.code === 1) {
          pricePoolContract
            .mint(result?.data?.message)
            .then((res: any) => {
              toastInfo('Wait')
              res
                .wait()
                .then((data: any) => {
                  onSuccessModal()
                })
                .catch((err: any) => {
                  ErrorText(err)
                })
            })
            .catch((err) => {
              ErrorText(err)
            })
        }
      })
      .catch((err) => {
        console.log('result', err)
        setIsoloading(false)
        offWaitModal()
      })
  }
  return (
    <StylePageWrapper>
      <StyleCreateContent>
        <StyleH2>Create New Item</StyleH2>
        <StyleUploadWrapper>
          <p>
            <em>*</em> Required fields
          </p>
          <div className="label_wrap">
            <span>Image, Video, Audio, or 3D Model</span>
          </div>
          <p>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
          <StyleUpload>
            {!preview && <img src="/images/upload.svg" className="uploading" alt="" />}
            {preview && (
              <Styledelete
                onClick={() => {
                  setpreview('')
                }}
              >
                <img src="/images/delete.svg" alt="" />
              </Styledelete>
            )}
            <div className="select_file">{preview}</div>
            <input id="media" name="media" type="file" onChange={chooseFile} />
          </StyleUpload>
          <StyleCommon>
            <StyleTitle>
              <StyleH3>Name *</StyleH3>
            </StyleTitle>
            <Input type="text" placeholder="Item name" value={nameText} onChange={handlenameText} />
          </StyleCommon>
          <StyleCommon>
            <StyleTitle>
              <StyleH3>Description *</StyleH3>
              <StyleSpan>
                The description will be included on the item&apos;s detail page underneath its image. Markdown syntax is
                supported.
              </StyleSpan>
            </StyleTitle>
            <textarea
              id="description"
              name="description"
              placeholder="Provide a detailed description of your item."
              rows={4}
              value={descriptionText}
              onChange={handleDescription}
            />
          </StyleCommon>
          <StyleCommon>
            <StyleTitle>
              <StyleH3>Properties</StyleH3>
              <StyleH4>Textual traits that show up as rectangles</StyleH4>
              <StyleButtonWrap>
                <Button type="button" onClick={onPresentModal}>
                  +
                </Button>
              </StyleButtonWrap>
              <div className="currentListWrap">
                <div className="currentList">
                  {currencies.map((data) =>
                    data.trait_type === '' && data.value === '' ? (
                      ''
                    ) : (
                      <div className="item_list">
                        <span>{data.trait_type}</span>
                        <h4>{data.value}</h4>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </StyleTitle>
          </StyleCommon>
          <StyleCommon>
            <StyleTitle>
              <StyleH3>Supply</StyleH3>
              <StyleSpan>The number of items that can be minted. No gas cost to you!</StyleSpan>
            </StyleTitle>
            <Input type="text" value={supplyText} onChange={handleSupplyText} />
          </StyleCommon>
          <StyleCommon>
            <StyleTitle>
              <StyleH3>Blockchain</StyleH3>
            </StyleTitle>
            <Input type="text" disabled placeholder="BNB Chain" />
          </StyleCommon>
          <Button type="button" mt="24px" onClick={createFun} isLoading={isLoading} disabled={!(nameText && preview)}>
            Create
          </Button>
        </StyleUploadWrapper>
      </StyleCreateContent>
    </StylePageWrapper>
  )
}

export default CreatePage
