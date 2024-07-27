import { useState, useEffect } from 'react'
import { Input, Button, Modal, useModal } from '@pancakeswap/uikit'
import styled from 'styled-components'
import CurrentInput from './CurrentInput'

const ProperContent = styled.div`
  position: relative;
  max-width: 550px;
  h5 {
    font-size: 14px;
    line-height: 1.5;
    font-weight: normal;
  }
  .protitle {
    width: 100%;
    overflow: hidden;
    span {
      width: 50%;
      float: left;
      text-align: start;
      padding: 15px 5px 15px 25px;

      &:first-of-type {
        padding-left: 50px;
      }
    }
  }
  .porList {
    width: 100%;
    position: relative;
    .item_list {
      width: 100%;
      overflow: hidden;
      margin-bottom: 10px;
      input {
        width: calc(50% - 25px);
        float: left;
        text-align: start;
        padding: 15px 5px;
        border-radius: 0;
      }
    }
    button {
      background-color: transparent;
      border: 1px solid rgba(14, 14, 44, 0.4);
      box-shadow: none;
      width: 40px;
      height: 40px;
      float: left;
      border-radius: 0;
    }
  }
  .addList {
    button {
      background-color: transparent;
      border: 1px solid rgba(14, 14, 44, 0.4);
      box-shadow: none;
    }
  }
`

const PropertiesModal: React.FC<React.PropsWithChildren<any>> = ({ currencies, handleCurrentcies, onDismiss }) => {
  const [list, setList] = useState<any>(() => {
    return currencies
  })
  const [isClear, setIsClear] = useState(false)
  const oldCurrencies = JSON.parse(JSON.stringify(currencies))
  const saveClick = async () => {
    handleCurrentcies(list)
    onDismiss()
  }
  const notChange = async () => {
    handleCurrentcies(oldCurrencies)
    onDismiss()
  }
  const callbackValue = (type, index, data) => {
    list[index][type] = data
  }
  const addMore = () => {
    const newList = list.concat({ trait_type: '', value: '' })
    setList(newList)
  }
  const removeItem = (index) => {
    console.log('list', list, index)
    // const newList = [...list]
    // const newList2 = newList.splice(index, 1)
    if (list.length === 1) {
      setList([{ trait_type: '', value: '' }])
      setIsClear(true)
      setTimeout(() => {
        setIsClear(false)
      }, 300)
    } else {
      setList((current) => current.filter((fruit, i) => i !== index))
    }
  }
  return (
    <Modal title="Add Properties" onDismiss={notChange}>
      <ProperContent>
        <h5>
          Properties show up underneath your item, are clickable, and can be filtered in your collection&apos;s sidebar.
        </h5>
        <div className="protitle">
          <span>Type</span>
          <span>Name</span>
        </div>
        <div className="porList">
          {list?.map((item, index) => (
            <div className="item_list">
              <Button
                type="button"
                onClick={() => {
                  removeItem(index)
                }}
              >
                x
              </Button>
              <CurrentInput
                item={item.trait_type}
                placeholder="Character"
                isClear={isClear}
                callback={(data) => {
                  callbackValue('trait_type', index, data)
                }}
              />
              <CurrentInput
                item={item.value}
                placeholder="Male"
                isClear={isClear}
                callback={(data) => {
                  callbackValue('value', index, data)
                }}
              />
            </div>
          ))}
        </div>
        <div className="addList">
          <Button type="button" onClick={addMore} mt="24px">
            Add more
          </Button>
        </div>
      </ProperContent>
      <Button type="button" onClick={saveClick} mt="24px">
        Save
      </Button>
    </Modal>
  )
}

export default PropertiesModal
