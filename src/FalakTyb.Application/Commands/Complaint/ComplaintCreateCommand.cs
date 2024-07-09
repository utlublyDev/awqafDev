
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ComplaintCreateCommand : IRequest<Complaint>
    {
        public Complaint Complaint { get; set; }
    }
}
