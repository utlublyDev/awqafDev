using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class RedeemDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
