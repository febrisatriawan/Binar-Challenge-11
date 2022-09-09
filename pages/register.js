import React, { useState } from 'react'
import Link from 'next/link'
import { Spinner } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { registerUser, updateCredentials } from '../redux/slices/registerSlice'
import { useSelector, useDispatch } from 'react-redux'
import Guest from '../middlewares/Guest'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.register)

  const onInputChange = (event) => {
    dispatch(
      updateCredentials({
        name: event.target.name,
        value: event.target.value
      })
    )
  }

  const onRegisterClick = async (event) => {
    event.preventDefault()
    dispatch(registerUser(auth.form))
  }

  const onValueChange = (event, label) => {
    const value = event.target.value
    setCredentials((prevState) => ({
      ...prevState,
      [label]: value
    }))
  }
  return (
    <Guest>
      <div style={{ backgroundColor: '#252525' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col" style={{ marginTop: 61, marginLeft: 72 }}>
              <Link href={'/'}>
                <h3
                  className="text-center pl-5"
                  style={{
                    color: '#FBBC05',
                    fontWeight: 'bold',
                    fontSize: '36px'
                  }}
                >
                  <img width={70} src="../../../assets/logoteamone.png" />
                  <span>Tradisional Game</span>
                </h3>
              </Link>
              <div
                className="mx-auto"
                style={{
                  width: 420,
                  height: 579,
                  padding: 40,
                  paddingTop: 111
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    style={{
                      fontSize: 24,
                      color: '#FFFFFF',
                      fontWeight: 400
                    }}
                  >
                    Register
                  </p>
                  <Link href={'/login'}>
                    <p style={{ fontSize: 16, color: '#FBBC05' }}>Login</p>
                  </Link>
                </div>
                <div>
                  <form onSubmit={onRegisterClick}>
                    <input
                      className="w-100"
                      style={{
                        height: ' 48px',
                        margin: '16px 0px',
                        padding: '0px 16px 0px 14px',
                        borderRadius: '4px',
                        border: '1px solid #D0D0D0',
                        fontSize: '14px',
                        color: '#8A8A8A'
                      }}
                      type="text"
                      placeholder="Nama Lengkap"
                      name="displayName"
                      onChange={onInputChange}
                    />
                    <input
                      className="w-100"
                      style={{
                        height: ' 48px',
                        margin: '16px 0px',
                        padding: '0px 16px 0px 14px',
                        borderRadius: '4px',
                        border: '1px solid #D0D0D0',
                        fontSize: '14px',
                        color: '#8A8A8A'
                      }}
                      type="email"
                      placeholder="Masukkan Email"
                      name="email"
                      onChange={onInputChange}
                    />
                    <input
                      className="w-100"
                      style={{
                        height: ' 48px',
                        margin: '16px 0px',
                        padding: '0px 16px 0px 14px',
                        borderRadius: '4px',
                        border: '1px solid #D0D0D0',
                        fontSize: '14px',
                        color: '#8A8A8A'
                      }}
                      type="password"
                      placeholder="Kata Sandi"
                      name="password"
                      onChange={onInputChange}
                    />
                    {auth.isLoading
                      ? (
                      <div className="d-flex justify-content-center">
                        <Spinner animation="border" variant="primary" />
                      </div>
                        )
                      : (
                      <button
                        className="w-100"
                        style={{
                          marginTop: '36px',
                          height: '46px',
                          background: '#F2C94C',
                          borderRadius: '8px',
                          color: '#FFFFFF',
                          fontSize: '16px',
                          border: 'none'
                        }}
                        onClick={onRegisterClick}
                      >
                        Register
                      </button>
                        )}
                  </form>
                </div>
                <p
                  style={{
                    marginTop: '33px',
                    fontWeight: '400',
                    fontSize: '14px',
                    color: '#FFFFFF'
                  }}
                ></p>
                <div className="d-flex justify-content-between" style={{ marginTop: '34px' }}>
                  <hr
                    style={{
                      display: 'block',
                      height: '1px',
                      border: '0',
                      borderTop: '1px solid #D0D0D0',
                      width: '100px'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col" style={{ margin: '24px' }}>
              <img src="../../../assets/img-login.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Guest>
  )
}

export default RegisterPage
