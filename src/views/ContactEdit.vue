<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm 
            :contact="contact"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactService from "@/services/contact.service"
import ContactForm from "@/components/ContactForm.vue"

export default {
    components: {
        ContactForm,
    },
    props: {
        id: { typde: String, required: true},
    },
    data() {
        return {
            contact: null,
            message: "",
        }
    },
    methods: {
        async getContact(id){
            try{
                this.contact = await ContactService.get(id)
            } catch (error) {
                console.log(error)
                // Chuyển sang trang Notfound đồng thời giữ cho URL không đổi
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$router.path.split("/").splice(1)
                    },
                    query: this.$router.query,
                    hash: this.$router.hash,
                })
            }
        },

        async updateContact(data) {
            try {
                await ContactService.update(this.contact._id, data)
                this.message = "Liên hệ được cập nhật thành công"
            } catch(error) {
                console.log(error)
            }
        }, 

        async deleteContact() {
            if(confirm("Bạn muốn xóa Liên hệ này?")) Ơ
            try{
                await ContactService.delete(this.contact._id)
                this.$router.push({ name: "contactbook"})
            } catch (error) {
                console.log(error)
            }
        }
    },

    created() {
        this.getContact(this.id)
        this.message = ""
    }
}
</script>