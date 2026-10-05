import "./ReportModal.scss"
import React, {useEffect, useState} from "react"
import {ModalWrapper, ModalWrapperTitle, ModalWrapperBody} from "/src/components/modals/base/ModalWrapper"
import {Spinner} from "react-bootstrap"

function ReportModal({ target, onDismiss }) {
    const [report, setReport] = useState("")
    const [loading, setLoading] = useState(false)
    const [shouldDismiss, setShouldDismiss] = useState(false)

    useEffect(() => {
        setShouldDismiss(false)

        if(!target?.reportPath) {
            setReport("")
            setLoading(false)
            return
        }

        setLoading(true)
        setReport("")

        const url = `data/${target.reportPath}`

        fetch(url)
            .then(response => {
                if(!response.ok)
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)

                return response.text()
            })
            .then(text => {
                setReport(text)
                setLoading(false)
            })
            .catch(error => {
                console.error("Report loading error:", error)
                setReport("Unable to load this report.")
                setLoading(false)
            })
    }, [target])

    if(!target)
        return <></>

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id="report-modal"
                      className="report-modal"
                      dialogClassName="modal-xl"
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>

            <ModalWrapperTitle title="Project Report"
                               faIcon="fa-solid fa-file-lines"
                               onClose={_onClose}
                               tooltip="hidden"/>

            <ModalWrapperBody className="report-modal-body">
                {loading ? (
                    <div className="report-modal-spinner">
                        <Spinner/>
                    </div>
                ) : (
                    <div className="report-modal-content">
                        {report}
                    </div>
                )}
            </ModalWrapperBody>

        </ModalWrapper>
    )
}

export default ReportModal